import { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardHeader, Button, Input } from '../components/ui';

export function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/users/login', {
        username: form.username,
        password: form.password,
      });
      const message = typeof response.data === 'string' ? response.data : 'Login successful.';
      setSuccess(message);
      setForm({ username: '', password: '' });
    } catch (err) {
      const message = err.response?.data || err.message || 'Login failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1 text-sm text-amber-200">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Account Access
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white font-display">
              Welcome back to the kitchen.
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl">
              Sign in to sync your favorites, track your cooking history, and unlock smarter recipe searches.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-zinc-300">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p className="font-medium text-white">Save your flavor profile</p>
                <p className="mt-1 text-zinc-400">Keep your favorite dishes and ratings in one place.</p>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                <p className="font-medium text-white">Fast, secure access</p>
                <p className="mt-1 text-zinc-400">Login uses the backend API for validation.</p>
              </div>
            </div>
          </div>

          <Card className="border-gradient animate-fade-in">
            <CardHeader>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white font-display">User Login</h2>
                <p className="text-sm text-zinc-400">Enter your username and password to continue.</p>
              </div>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="e.g. spicecollector"
                  autoComplete="username"
                  required
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                />

                {error && (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                    {success}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
