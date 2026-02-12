import { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { getUsers } from '../utils/storage';
import { approveUser, rejectUser } from '../utils/auth';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import StatusBadge from '../components/StatusBadge';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import type { User } from '../utils/storage';

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = () => {
    const allUsers = getUsers();
    const regularUsers = allUsers.filter(u => u.role === 'user');
    setUsers(regularUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleApprove = (email: string) => {
    approveUser(email);
    loadUsers();
  };

  const handleReject = (email: string) => {
    rejectUser(email);
    loadUsers();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <AnimatedRouteWrapper>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 animate-fade-in-down text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
            <Shield className="h-8 w-8 text-neon-blue" />
          </div>
          <h1 className="mb-4 text-5xl font-bold text-white">
            Admin <span className="text-neon-blue">Panel</span>
          </h1>
          <p className="text-xl text-gray-400">Manage user approvals</p>
        </div>

        <div className="glass-panel animate-fade-in-up rounded-3xl border border-white/10 p-6 backdrop-blur-xl">
          {users.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              No users registered yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Registration Time</TableHead>
                    <TableHead className="text-right text-white">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium text-white">{user.name}</TableCell>
                      <TableCell className="text-gray-300">{user.email}</TableCell>
                      <TableCell>
                        <StatusBadge status={user.status} />
                      </TableCell>
                      <TableCell className="text-gray-300">{formatDate(user.registeredAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(user.email)}
                            disabled={user.status === 'approved'}
                            className="bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          >
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(user.email)}
                            disabled={user.status === 'rejected'}
                            className="bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          >
                            <XCircle className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </AnimatedRouteWrapper>
  );
}
