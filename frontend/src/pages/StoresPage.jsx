import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Store, MapPin, Filter, Plus } from 'lucide-react';
import { Card, CardBody, SearchInput, Button, Input } from '../components/ui';
import { storeApi, groceryStoreOwnersApi, authUtils } from '../services/api';

export function StoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newStore, setNewStore] = useState({ name: '', address: '' });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');
  const [isGroceryStoreOwner, setIsGroceryStoreOwner] = useState(false);
  const [hasOwnedStore, setHasOwnedStore] = useState(false);

  const user = authUtils.getUser();

  useEffect(() => {
    loadStores();
    checkOwnerStatus();
  }, []);

  const checkOwnerStatus = async () => {
    if (!user) return;
    try {
      const isOwner = await groceryStoreOwnersApi.isOwner(user.userID);
      setIsGroceryStoreOwner(isOwner);
      if (isOwner) {
        // Check if they already own a store
        try {
          const owned = await groceryStoreOwnersApi.getOwnedStore(user.userID);
          setHasOwnedStore(owned && owned.length > 0);
        } catch {
          setHasOwnedStore(false);
        }
      }
    } catch (err) {
      console.error('Failed to check owner status:', err);
    }
  };

  const loadStores = async () => {
    try {
      setLoading(true);
      const data = await storeApi.getAll();
      setStores(data);
      setError('');
    } catch (err) {
      setError('Failed to load stores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredStores = useMemo(() => {
    let filtered = [...stores];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.address.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [stores, searchQuery]);

  const handleCreateStore = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    try {
      await storeApi.create(newStore);
      setShowCreateForm(false);
      setNewStore({ name: '', address: '' });
      loadStores();
    } catch (err) {
      setCreateError(err.response?.data || 'Failed to create store');
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Store className="w-16 h-16 text-zinc-700 mx-auto mb-4 animate-pulse" />
        <p className="text-zinc-400">Loading stores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <Store className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-400">{error}</p>
        <Button onClick={loadStores} className="mt-4">Retry</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Grocery Stores</h1>
          <p className="text-zinc-400">Find {stores.length} grocery stores near you</p>
        </div>
        {isGroceryStoreOwner && !hasOwnedStore && (
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="w-4 h-4" />
            Add Store
          </Button>
        )}
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="mb-8" hover={false}>
          <CardBody>
            <h3 className="text-lg font-semibold text-white mb-4">Add New Store</h3>
            <form onSubmit={handleCreateStore} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={newStore.name}
                onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                required
                maxLength={20}
              />
              <Input
                label="Address"
                value={newStore.address}
                onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                required
                maxLength={50}
              />
              {createError && (
                <div className="md:col-span-2 text-red-400 text-sm">{createError}</div>
              )}
              <div className="md:col-span-2 flex gap-2">
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? 'Adding...' : 'Add Store'}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}

      {/* Search */}
      <Card className="mb-8" hover={false}>
        <CardBody>
          <div className="flex items-center gap-2 mb-4 text-zinc-400">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Search</span>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores..."
            className="max-w-md"
          />
        </CardBody>
      </Card>

      {/* Results Count */}
      <div className="mb-6 text-zinc-400">
        Showing {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''}
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.map((store) => (
          <Link key={store.storeID} to={`/stores/${store.storeID}`}>
            <Card className="h-full group">
              <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                <Store className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-zinc-700 group-hover:text-blue-500/30 transition-colors" />
              </div>
              <CardBody>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {store.name}
                </h3>
                <div className="flex items-start gap-2 text-zinc-400">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{store.address}</span>
                </div>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredStores.length === 0 && (
        <div className="text-center py-16">
          <Store className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No stores found</h3>
          <p className="text-zinc-400">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
}
