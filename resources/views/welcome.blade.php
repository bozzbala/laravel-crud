<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>
        <link href="{{ asset('client/dist/main.css') }}" rel="stylesheet" type="text/css"/>
        <script type="text/javascript" src="{{ asset('client/dist/main.js') }}"></script>

    </head>
    <body class="antialiased">
        <div class="page-wrap">
            <div class="top-warning">
                <div class="centered-block">
                    <div class="row">    
                        <div class="left-filler"></div>
                        <div class="centered-text">FREE SHIPPING ON ALL FULL SUN PLANTS! FEB. 25–28. </div>
                        <div class="right-col">
                            <div class="currency">USD</div>
                            <a class="support-btn" href="#">Support</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-header">
                <div class="logo"><img src="{{ url('/images/logo.svg') }}" class="img" alt=""/></div>
                <div class="menu"></div>
                <div class="right"></div>
            </div>
            <div class="page-content">
                <div class="block-intro">
                    <div class="container">
                        <h1 class="title">Plants are our Passion</h1>
                        <div class="description">Even if you don’t have a green thumb, you can still have a green home.</div>
                        <a href="#" class="button">GET PLANTING</a>
                    </div>
                </div>
            </div>
            <div class="page-footer">
            </div>
        </div>
    </body>
</html>