import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type ContentType = {
    __kind__: "liveEmbed";
    liveEmbed: string;
} | {
    __kind__: "videoFile";
    videoFile: ExternalBlob;
} | {
    __kind__: "videoLink";
    videoLink: string;
} | {
    __kind__: "document";
    document: ExternalBlob;
};
export interface ContentItem {
    id: bigint;
    status: ContentStatus;
    title: string;
    contentType: ContentType;
    createdAt: bigint;
    createdBy: Principal;
    description: string;
}
export interface ContentStatus {
    deleted: boolean;
    enabled: boolean;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addContent(title: string, description: string, contentType: ContentType, isEnabled: boolean): Promise<bigint>;
    adminGetAllContent(): Promise<Array<ContentItem>>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteContent(contentId: bigint): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getContentItems(): Promise<Array<ContentItem>>;
    isCallerAdmin(): Promise<boolean>;
    setContentStatus(contentId: bigint, enabled: boolean): Promise<void>;
}
