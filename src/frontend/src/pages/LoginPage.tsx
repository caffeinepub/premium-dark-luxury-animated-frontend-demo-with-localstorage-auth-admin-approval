import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuthzState } from '../hooks/useAuthzState';
import { recordLogin } from '../utils/analytics';
import { getUser } from '../utils/storage';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import AnimatedRouteWrapper from '../components/motion/AnimatedRouteWrapper';
import BabyComedyLoginAnimation from '../components/motion/BabyComedyLoginAnimation';
import RegisterModal from '../components/auth/RegisterModal';
import { getReturnTo, clearReturnTo } from '../utils/returnTo';

export default function LoginPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { register?: string; returnTo?: string };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { setAuthzState, clearAuthzState } = useAuthzState();

  // Auto-open register modal if coming from /register redirect
  useEffect(() => {
    if (search?.register === 'true') {
      setRegisterModalOpen(true);
    }
  }, [search]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate authentication - in production this would call Firebase Auth
      // For now, validate against localStorage users (temporary until Firebase is added)
      const user = getUser(email);

      if (!user || user.password !== password) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      // Simulate fetching Firestore user document
      // In production: const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = user.role;
      const approved = user.approved;
      const allowedPages = user.allowedPages;
      const name = user.name;

      // Block non-admin users who are not approved
      if (role !== 'admin' && !approved) {
        setError('Your account is waiting for admin approval.');
        clearAuthzState();
        setLoading(false);
        return;
      }

      // Set authorization state in memory (not localStorage)
      setAuthzState({
        role,
        approved,
        allowedPages,
        email: user.email,
        name,
      });

      // Record successful login in analytics
      recordLogin();

      // Get the return-to destination
      const returnTo = getReturnTo(search);
      clearReturnTo();

      // Navigate to the preserved destination or default to home
      const destination = returnTo && returnTo !== '/login' && returnTo !== '/register' ? returnTo : '/';

      setTimeout(() => {
        navigate({ to: destination as any });
      }, 100);
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatedRouteWrapper>
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in-up">
          <div className="glass-panel rounded-3xl border border-white/10 p-8 backdrop-blur-xl">
            {/* Baby comedy animation section */}
            <BabyComedyLoginAnimation />

            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl bg-neon-blue/20 shadow-neon">
                <LogIn className="h-8 w-8 text-neon-blue" />
              </div>
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="mt-2 text-gray-400">Sign in to your account</p>
            </div>

            {error && (
              <div className="animate-fade-in-down">
                <Alert variant="destructive" className="mb-6 border-red-500/50 bg-red-500/10">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="glow-button w-full bg-neon-blue text-white hover:bg-neon-blue/90"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setRegisterModalOpen(true)}
                  className="text-neon-blue transition-colors hover:text-neon-blue/80 underline"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal
        open={registerModalOpen}
        onOpenChange={setRegisterModalOpen}
        onSuccess={() => {
          // Modal already closed, user stays on login page
        }}
      />
    </AnimatedRouteWrapper>
  );
}
