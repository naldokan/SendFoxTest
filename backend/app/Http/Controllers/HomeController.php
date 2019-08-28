<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Template;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function store(Request $request) {
        $template = new Template;
        $template->emaildata = $request->email;
        $template->save();
    }

    public function list() {
        $templates = Template::orderBy('created_at', 'desc')->paginate(5);
        $templates->map(function ($template) {
            //dd($template);
            //$template->emailData = \json_decode($template->emailData);
            return $template;
        });
        return view('list', ['templates' => $templates]);
    }
}
