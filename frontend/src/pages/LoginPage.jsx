import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Input } from '../components/ui';
import { userApi, authUtils, restaurantApi, restaurantOwnersApi, storeApi, groceryStoreOwnersApi } from '../services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', address: '', password: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [accountType, setAccountType] = useState('regular');
  const [restaurantForm, setRestaurantForm] = useState({ name: '', address: '', rating: 3 });
  const [groceryStoreForm, setGroceryStoreForm] = useState({ name: '', address: '' });
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
      if (isRegistering) {
        // Register the user
        await userApi.register(form.username, form.address, form.password);
        
        if (accountType === 'restaurantOwner') {
          // Auto-login to get user data
          const user = await userApi.login(form.username, form.password);
          
          // Create the restaurant
          await restaurantApi.create(restaurantForm);
          
          // Get the newly created restaurant
          const allRestaurants = await restaurantApi.getAll();
          const newRestaurant = allRestaurants.find(
            r => r.name === restaurantForm.name && r.address === restaurantForm.address
          );
          
          if (newRestaurant) {
            // Assign restaurant to owner
            await restaurantOwnersApi.assignRestaurant(user.userID, newRestaurant.restID);
          }
          
          authUtils.saveUser(user);
          setSuccess('Restaurant owner account created! Redirecting...');
          setTimeout(() => navigate('/restaurants'), 1000);
        } else if (accountType === 'groceryStoreOwner') {
          // Auto-login to get user data
          const user = await userApi.login(form.username, form.password);
          
          // Create the grocery store
          await storeApi.create(groceryStoreForm);
          
          // Get the newly created store
          const allStores = await storeApi.getAll();
          const newStore = allStores.find(
            s => s.name === groceryStoreForm.name && s.address === groceryStoreForm.address
          );
          
          if (newStore) {
            // Assign store to owner
            await groceryStoreOwnersApi.assignStore(user.userID, newStore.storeID);
          }
          
          authUtils.saveUser(user);
          setSuccess('Grocery store owner account created! Redirecting...');
          setTimeout(() => navigate('/stores'), 1000);
        } else {
          setSuccess('Account created! You can now sign in.');
          setIsRegistering(false);
          setForm({ username: form.username, address: '', password: '' });
        }
      } else {
        const user = await userApi.login(form.username, form.password);
        authUtils.saveUser(user);
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => navigate('/profile'), 1000);
      }
    } catch (err) {
      const fallbackMessage = isRegistering ? 'Registration failed.' : 'Login failed.';
      const message = err.response?.data || err.message || fallbackMessage;
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
                <h2 className="text-2xl font-semibold text-white font-display">
                  {isRegistering ? 'Create Your Account' : 'User Login'}
                </h2>
                <p className="text-sm text-zinc-400">
                  {isRegistering
                    ? 'Create your profile to start saving favorites.'
                    : 'Enter your username and password to continue.'}
                </p>
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
                {isRegistering && (
                  <Input
                    label="Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Kitchen St"
                    autoComplete="street-address"
                    required
                  />
                )}
                
                {isRegistering && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-zinc-300">Account Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="regular"
                          checked={accountType === 'regular'}
                          onChange={(e) => setAccountType(e.target.value)}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className="text-sm text-zinc-300">Regular User</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="restaurantOwner"
                          checked={accountType === 'restaurantOwner'}
                          onChange={(e) => setAccountType(e.target.value)}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className="text-sm text-zinc-300">Restaurant Owner</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="accountType"
                          value="groceryStoreOwner"
                          checked={accountType === 'groceryStoreOwner'}
                          onChange={(e) => setAccountType(e.target.value)}
                          className="w-4 h-4 text-amber-500"
                        />
                        <span className="text-sm text-zinc-300">Grocery Store Owner</span>
                      </label>
                    </div>
                  </div>
                )}

                {isRegistering && accountType === 'restaurantOwner' && (
                  <div className="space-y-4 p-4 border border-amber-500/30 rounded-lg bg-amber-500/5">
                    <h3 className="text-sm font-medium text-amber-300">Restaurant Details</h3>
                    <Input
                      label="Restaurant Name"
                      value={restaurantForm.name}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, name: e.target.value })}
                      placeholder="e.g. George's Bistro"
                      required
                      maxLength={20}
                    />
                    <Input
                      label="Restaurant Address"
                      value={restaurantForm.address}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, address: e.target.value })}
                      placeholder="456 Main St"
                      required
                      maxLength={50}
                    />
                    <Input
                      label="Initial Rating (1-5)"
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={restaurantForm.rating}
                      onChange={(e) => setRestaurantForm({ ...restaurantForm, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                )}

                {isRegistering && accountType === 'groceryStoreOwner' && (
                  <div className="space-y-4 p-4 border border-blue-500/30 rounded-lg bg-blue-500/5">
                    <h3 className="text-sm font-medium text-blue-300">Grocery Store Details</h3>
                    <Input
                      label="Store Name"
                      value={groceryStoreForm.name}
                      onChange={(e) => setGroceryStoreForm({ ...groceryStoreForm, name: e.target.value })}
                      placeholder="e.g. Roberto's Market"
                      required
                      maxLength={20}
                    />
                    <Input
                      label="Store Address"
                      value={groceryStoreForm.address}
                      onChange={(e) => setGroceryStoreForm({ ...groceryStoreForm, address: e.target.value })}
                      placeholder="789 Commerce Ave"
                      required
                      maxLength={50}
                    />
                  </div>
                )}
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
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
                  {loading
                    ? isRegistering
                      ? accountType === 'restaurantOwner' ? 'Creating restaurant account...' 
                        : accountType === 'groceryStoreOwner' ? 'Creating store account...'
                        : 'Creating account...'
                      : 'Signing in...'
                    : isRegistering
                      ? accountType === 'restaurantOwner' ? 'Create Restaurant Account' 
                        : accountType === 'groceryStoreOwner' ? 'Create Store Account'
                        : 'Create Account'
                      : 'Sign In'}
                </Button>
                <button
                  type="button"
                  className="w-full text-sm text-zinc-400 hover:text-white"
                  onClick={() => {
                    setIsRegistering((prev) => !prev);
                    setAccountType('regular');
                    setRestaurantForm({ name: '', address: '', rating: 3 });
                    setGroceryStoreForm({ name: '', address: '' });
                    setError('');
                    setSuccess('');
                  }}
                >
                  {isRegistering
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Create one"}
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
