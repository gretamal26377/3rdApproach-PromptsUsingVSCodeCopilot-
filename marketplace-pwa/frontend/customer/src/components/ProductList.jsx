import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "shared-lib/src/components/ui/card"; // Adjust path if needed
import { Badge } from "shared-lib/src/components/ui/badge"; // Adjust path if needed
import { Button } from "shared-lib/src/components/ui/button"; // Adjust path if needed
import { ShoppingCart } from "lucide-react"; // Adjust path if needed
import { cn } from "shared-lib/src/lib/utils"; // Adjust path if needed
import ProductCard from "./ProductCard";

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
