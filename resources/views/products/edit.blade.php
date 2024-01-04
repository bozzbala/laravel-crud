<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Edit product</h1>
    @if($errors->any())
    <ul class="errors">
        @foreach ($errors->all() as $error)
            <li class="error">{{ $error }}</li>
        @endforeach
    </ul>
    @endif
    <form action="{{ route('product.update', ['product' => $product]) }}" method="post">
        @csrf
        @method("put")
        <div>
            <input type="text" name="title" placeholder="Title" value="{{ $product['title'] }}"/>
        </div>
        <div>
            <input type="text" name="price" placeholder="Price" value="{{ $product['price'] }}"/>
        </div>
        <div>
            <input type="text" name="quantity" placeholder="Quantity" value="{{ $product['quantity'] }}"/>
        </div>
        <div>
            <textarea name="description" placeholder="Description" rows="10">{{ $product['description'] }}</textarea>
        </div>
        <div>
            <div>In stock:</div>
            <input type="checkbox" name="in_stock" value="{{ $product['in_stock'] }}" @checked(old('1', $product['in_stock']))/>
        </div>
        <div>
            <input type="submit" value="Update a product"/>
        </div>
    </form>
</body>
</html>