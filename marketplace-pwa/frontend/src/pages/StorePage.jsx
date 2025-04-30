import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock data (replace with actual API calls)
const mockStores = [
  { id: 1, name: 'Electronics Store', description: 'Your one-stop shop for the latest electronics.' },
  { id: 2, name: 'Fashion Hub', description: 'Trendy clothing and accessories for all styles.' },
  { id: 3, name: 'Home & Garden', description: 'Find everything you need for your home and garden.' },
];

const mockProducts = [
    { id: 1, name: 'Laptop', description: 'Powerful laptop for work and play', price: 1200, storeId: 1 },
    { id: 2, name: 'Smartphone', description: 'Latest smartphone with amazing features', price: 1000, storeId: 1 },
    { id: 3, name: 'T-Shirt', description: 'Comfortable and stylish t-shirt', price: 25, storeId: 2 },
    { id: 4, name: 'Jeans', description: 'Classic jeans for a perfect fit', price: 50, storeId: 2 },
    { id: 5, name: 'Sofa', description: 'Cozy sofa for your living room', price: 500, storeId: 3 },
    { id: 6, name: 'Garden Tools Set', description: 'Essential tools for gardening', price: 75, storeId: 3 },
];

const StorePage = ({ addToCart }) => {
  const { storeId } = useParams<{ storeId: string }>(); // Issue?: Using TypeScript for type safety. Besides, storeId should be a number, not a string
  const [store, setStore] = useState<{ id: number; name: string; description: string; } | null>(null);
  const [products, setProducts] = useState<{ id: number; name: string; description: string; price: number; storeId: number; }[]>([]);

  useEffect(() => {
    // Fetch store and products based on storeId
    const id = parseInt(storeId, 10);
    const foundStore = mockStores.find((s) => s.id === id);
    const foundProducts = mockProducts.filter((p) => p.storeId === id);

    if (foundStore) {
      setStore(foundStore);
    }
    if(foundProducts){
        setProducts(foundProducts);
    }
  }, [storeId]);

  if (!store) {
    return <div>Store not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold">{store.name}</h1>
        <p className="text-gray-600">{store.description}</p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Products from {store.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-700 mb-2">{product.description}</p>
                <Badge variant="outline" className="mb-2">Price: ${product.price}</Badge>
                 </CardContent>
              <div className="p-4">
                <Button
                  onClick={() => addToCart(product)}
                  className={cn(
                    "w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StorePage;
