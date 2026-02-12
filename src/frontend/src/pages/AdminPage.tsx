import { useState, useEffect } from 'react';
import { Shield, Users, Activity, Eye } from 'lucide-react';
import { getAnalyticsData, subscribeToAnalyticsUpdates } from '../utils/analytics';
import { useAdminGetAllContent } from '../hooks/useQueries';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import StatusBadge from '../components/StatusBadge';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import AdminContentForm from '../components/content/AdminContentForm';
import AdminContentList from '../components/content/AdminContentList';
import { 
  fetchRegularUsers, 
  updateUserApproval, 
  updateUserAllowedPages,
  type FirestoreUser 
} from '../utils/firestoreUserManagement';

const AVAILABLE_PAGES = [
  { id: 'home', label: 'Home' },
  { id: 'intelus', label: 'Intelus' },
  { id: 'live', label: 'Live' },
  { id: 'myVideos', label: 'My Videos' },
  { id: 'myFiles', label: 'My Files' },
  { id: 'notes', label: 'Notes' },
  { id: 'admin', label: 'Admin' },
];

export default function AdminPage() {
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [analytics, setAnalytics] = useState(getAnalyticsData());
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [tempPermissions, setTempPermissions] = useState<Record<string, string[]>>({});
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { data: contentItems = [], isLoading: contentLoading } = useAdminGetAllContent();

  const loadUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const firestoreUsers = await fetchRegularUsers();
      setUsers(firestoreUsers);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const loadAnalytics = () => {
    setAnalytics(getAnalyticsData());
  };

  useEffect(() => {
    loadUsers();
    loadAnalytics();

    const unsubscribe = subscribeToAnalyticsUpdates(loadAnalytics);
    return unsubscribe;
  }, []);

  const handleToggleApproval = async (uid: string, currentApproved: boolean) => {
    try {
      await updateUserApproval(uid, !currentApproved);
      await loadUsers();
    } catch (error) {
      console.error('Failed to toggle approval:', error);
    }
  };

  const handleEditPermissions = (uid: string, currentPages: string[]) => {
    setEditingUser(uid);
    setTempPermissions({ ...tempPermissions, [uid]: [...currentPages] });
  };

  const handleTogglePermission = (uid: string, pageId: string) => {
    const current = tempPermissions[uid] || [];
    const updated = current.includes(pageId)
      ? current.filter(p => p !== pageId)
      : [...current, pageId];
    setTempPermissions({ ...tempPermissions, [uid]: updated });
  };

  const handleSavePermissions = async (uid: string) => {
    setIsSaving(true);
    try {
      const pages = tempPermissions[uid] || [];
      await updateUserAllowedPages(uid, pages);
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      console.error('Failed to save permissions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const totalMembers = users.length;
  const totalPageVisits =
    analytics.pageVisits.home +
    analytics.pageVisits.videos +
    analytics.pageVisits.portfolio +
    analytics.pageVisits.admin;

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="mb-8 md:mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <Shield className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-4xl md:text-5xl font-bold text-white">
            Admin <span className="text-neon-blue">Panel</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400">Manage users and content</p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon-blue/20 flex-shrink-0">
                <Users className="h-6 w-6 text-neon-blue" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-white">{totalMembers}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up animation-delay-100">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20 flex-shrink-0">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400">Total Logins</p>
                <p className="text-2xl font-bold text-white">{analytics.successfulLogins}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 flex-shrink-0">
                <Eye className="h-6 w-6 text-purple-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400">Page Visits</p>
                <p className="text-2xl font-bold text-white">{totalPageVisits}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20 flex-shrink-0">
                <Shield className="h-6 w-6 text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-400">Content Items</p>
                <p className="text-2xl font-bold text-white">{contentItems.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-luxury-dark/50 mb-6">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content Library</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="glass-panel rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden">
              {isLoadingUsers ? (
                <div className="text-center text-gray-400 py-12">Loading users...</div>
              ) : users.length === 0 ? (
                <div className="text-center text-gray-400 py-12">No users found</div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-transparent">
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Registered</TableHead>
                          <TableHead className="text-gray-300">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.uid} className="border-white/5 hover:bg-white/5">
                            <TableCell className="text-white">{user.name}</TableCell>
                            <TableCell className="text-gray-400">{user.email}</TableCell>
                            <TableCell>
                              <StatusBadge approved={user.approved} />
                            </TableCell>
                            <TableCell className="text-gray-400">
                              {formatDate(user.registeredAt)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2 flex-wrap">
                                <Button
                                  size="sm"
                                  onClick={() => handleToggleApproval(user.uid, user.approved)}
                                  className={user.approved 
                                    ? "bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                                    : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                  }
                                >
                                  {user.approved ? 'Revoke' : 'Approve'}
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleEditPermissions(user.uid, user.allowedPages)}
                                  className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                                >
                                  Permissions
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden p-4 space-y-4">
                    {users.map((user) => (
                      <div
                        key={user.uid}
                        className="bg-luxury-dark/50 rounded-xl p-4 border border-white/5"
                      >
                        <div className="mb-3">
                          <h3 className="text-white font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <StatusBadge approved={user.approved} />
                          <span className="text-xs text-gray-500">
                            {formatDate(user.registeredAt)}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleToggleApproval(user.uid, user.approved)}
                            className={user.approved 
                              ? "flex-1 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                              : "flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            }
                          >
                            {user.approved ? 'Revoke' : 'Approve'}
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleEditPermissions(user.uid, user.allowedPages)}
                            className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
                          >
                            Permissions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Permission Editor Modal */}
            {editingUser && (
              <div className="glass-panel rounded-2xl border border-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Edit Permissions for {users.find(u => u.uid === editingUser)?.name}
                </h3>
                <div className="space-y-3 mb-6">
                  {AVAILABLE_PAGES.map((page) => (
                    <div key={page.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={`page-${page.id}`}
                        checked={(tempPermissions[editingUser] || []).includes(page.id)}
                        onCheckedChange={() => handleTogglePermission(editingUser, page.id)}
                        disabled={isSaving}
                      />
                      <label
                        htmlFor={`page-${page.id}`}
                        className="text-white cursor-pointer select-none"
                      >
                        {page.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleSavePermissions(editingUser)}
                    className="bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Content Library Tab */}
          <TabsContent value="content" className="space-y-6">
            <AdminContentForm />
            {contentLoading ? (
              <div className="text-center text-gray-400 py-12">Loading content...</div>
            ) : (
              <AdminContentList items={contentItems} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRouteWrapper>
  );
}
