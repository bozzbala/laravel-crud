<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Create product</h1>
    @if($errors->any())
    <ul class="errors">
        @foreach ($errors->all() as $error)
            <li class="error">{{ $error }}</li>
        @endforeach
    </ul>
    @endif
    <form action="{{ route('product.store') }}" method="post">
        @csrf
        @method("post")
        <div>
            <input type="text" name="title" placeholder="Title"/>
        </div>
        <div>
            <input type="text" name="price" placeholder="Price"/>
        </div>
        <div>
            <input type="text" name="quantity" placeholder="Quantity"/>
        </div>
        <div>
            <textarea name="description" placeholder="Description" rows="10"></textarea>
        </div>
        <div>
            <input type="submit" value="Add new product"/>
        </div>
    </form>
</body>
</html>