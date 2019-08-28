@extends('layouts.app')
@push('css')
<style>
#templates {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 20px;
}

#templates td, #templates th {
    border: 1px solid #ddd;
    padding: 8px;
}

#templates tr:nth-child(even){background-color: #f2f2f2;}

#templates tr:hover {background-color: #ddd;}

#templates th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
}
</style>
@endpush
@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <table id="templates">
                    <thead>
                        <tr>
                            <th> email </th>
                        </tr>
                    </thead>
                    <tbody>
                            @foreach($templates as $template)
                            <tr>
                                <td> {{$template->emailData}} </td>
                            </tr>
                            @endforeach
                    </tbody>
                </table>
                {{ $templates->links() }}
            </div>
        </div>
    </div>    
@endsection