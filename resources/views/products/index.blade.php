<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Products</h1>
    <p><a href="{{ route('product.create') }}">Create new product</a></p>
    @if(session()->has('success'))
        <div>
            {{ session('success') }}
        </div>
    @endif
    <div class="table-container">
        <table class="table" border="1">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>In stock</th>
                <th></th>
                <th></th>
            </tr>
            @foreach ($products as $item) 
            <tr>
                <td>{{ $item['id'] }}</td>
                <td>{{ $item['title'] }}</td>
                <td>{{ $item['quantity'] }}</td>
                <td>{{ $item['price'] }}</td>
                <td>{{ $item['in_stock'] == 1 ? "Yes" : "No"}}</td>
                <td><a href="{{ route('product.edit', ['product' => $item]) }}">EDIT</a></td>
                <td class="table-delete-button">
                    <form action="{{ route('product.destroy', ['product' => $item]) }}" method="post">
                        @csrf
                        @method("delete")
                        <input type="submit" value="DELETE" />
                    </form>
                </td>
            </tr>
            @endforeach
        </table>
    </div>
</body>
</html>