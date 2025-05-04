import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Adjust path if needed
import { Badge } from "./ui/badge"; // Adjust path if needed
import { Button } from "./ui/button"; // Adjust path if needed
import { ShoppingCart } from "lucide-react"; // Adjust path if needed
import { cn } from "../lib/utils"; // Adjust path if needed

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="transition-transform transform hover:scale-105 hover:shadow-lg flex flex-col"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              {product.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-700 mb-2">{product.description}</p>
            <Badge variant="outline" className="mb-2">
              Price: ${product.price}
            </Badge>
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
  );
};

export default ProductList;
