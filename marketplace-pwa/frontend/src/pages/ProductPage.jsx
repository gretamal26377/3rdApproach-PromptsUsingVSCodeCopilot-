import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { cn } from '../../lib/utils';

// Mock data (replace with actual API calls)
const mockProducts = [
  { id: 1, name: 'Laptop', description: 'Powerful laptop for work and play', price: 1200, storeId: 1 },
  { id: 2, name: 'Smartphone', description: 'Latest smartphone with amazing features', price: 1000, storeId: 1 },
  { id: 3, name: 'T-Shirt', description: 'Comfortable and stylish t-shirt', price: 25, storeId: 2 },
  { id: 4, name: 'Jeans', description: 'Classic jeans for a perfect fit', price: 50, storeId: 2 },
];

const ProductPage = ({ addToCart }) => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<{ id: number; name: string; description: string; price: number; storeId: number; } | null>(null);

  useEffect(() => {
    // Fetch product based on productId
    const id = parseInt(productId, 10);
    const foundProduct = mockProducts.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <Card className="w-full max-w-md transition-transform transform hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <Badge variant="outline" className="mb-4">Price: ${product.price}</Badge>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
