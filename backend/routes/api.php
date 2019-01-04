<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//List of passwords
Route::get('passwords','PasswordController@index');

 //One password
 Route::get('password/{id}','PasswordController@show');

 //Create new password
 Route::post('password', 'PasswordController@store');

 //Update password
 Route::put('password','PasswordController@store');

 //Delete Password
 Route::delete('password/{id}','PasswordController@destroy');
