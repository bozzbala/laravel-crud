<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return view('products.index', ['products' => $products]);
    }

    public function create(){
        return view('products.create');
    }

    public function store(Request $request){
        $data = $request->validate([
            "title" => "required",
            "price" => "required|decimal:0,2",
            "quantity" => "required|numeric",
            "description" => "nullable",
        ]);

        $newProduct = Product::create($data);

        return redirect(route("product.index"));
    }

    public function edit(Product $product){
        return view('products.edit', ['product' => $product]);
    }

    public function update(Product $product, Request $request){
        $data = $request->validate([
            "title" => "required",
            "price" => "required|decimal:0,2",
            "quantity" => "required|numeric",
            "description" => "nullable",
            "in_stock" => "nullable",
        ]);
       
        $data['in_stock'] = !empty($data['in_stock']) ? 1 : 0;

        $product->update($data);

        return redirect(route("product.index"))->with('success', 'Product updated succesfully');
    }

    public function destroy(Product $product){

        $product->delete();

        return redirect(route("product.index"))->with('success', 'Product deleted succesfully');
    }
}
