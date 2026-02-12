import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";



actor {
  // Include components
  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Type Definitions
  public type ContentType = {
    #videoLink : Text; // Google Drive links
    #videoFile : Storage.ExternalBlob; // Direct video uploads
    #document : Storage.ExternalBlob; // PDF/document uploads
    #liveEmbed : Text; // Embedded live content links
  };

  public type ContentStatus = {
    enabled : Bool;
    deleted : Bool;
  };

  public type ContentItem = {
    id : Nat;
    title : Text;
    description : Text;
    contentType : ContentType;
    status : ContentStatus;
    createdBy : Principal;
    createdAt : Nat;
  };

  var nextId = 1;

  let contentItems = Map.empty<Nat, ContentItem>();

  // Admin-only guard helper
  func assertAdmin(caller : Principal) {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Admin only");
    };
  };

  // Add content (Admin only)
  public shared ({ caller }) func addContent(
    title : Text,
    description : Text,
    contentType : ContentType,
    isEnabled : Bool,
  ) : async Nat {
    assertAdmin(caller);

    let id = nextId;
    nextId += 1;

    let contentItem : ContentItem = {
      id;
      title;
      description;
      contentType;
      status = {
        enabled = isEnabled;
        deleted = false;
      };
      createdBy = caller;
      createdAt = 0; // Placeholder for timestamp
    };

    contentItems.add(id, contentItem);
    id;
  };

  // Get content for users (only enabled and not deleted)
  public query ({ caller }) func getContentItems() : async [ContentItem] {
    contentItems.values().toArray().filter(
      func(item) {
        item.status.enabled and not item.status.deleted
      }
    );
  };

  // Get all content for admin
  public query ({ caller }) func adminGetAllContent() : async [ContentItem] {
    assertAdmin(caller);
    contentItems.values().toArray();
  };

  // Enable/Disable content (Admin only)
  public shared ({ caller }) func setContentStatus(contentId : Nat, enabled : Bool) : async () {
    assertAdmin(caller);

    switch (contentItems.get(contentId)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) {
        let updatedContent = {
          content with
          status = {
            enabled;
            deleted = content.status.deleted;
          };
        };
        contentItems.add(contentId, updatedContent);
      };
    };
  };

  // Delete content (Admin only)
  public shared ({ caller }) func deleteContent(contentId : Nat) : async () {
    assertAdmin(caller);

    switch (contentItems.get(contentId)) {
      case (null) { Runtime.trap("Content not found") };
      case (?content) {
        let updatedContent = {
          content with
          status = {
            enabled = content.status.enabled;
            deleted = true;
          };
        };
        contentItems.add(contentId, updatedContent);
      };
    };
  };
};
