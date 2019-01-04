<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Password;
use App\Http\Resources\Password as PasswordResource;

class PasswordController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */

   public function index()
   {
       //Get Password
       $passwords = Password::orderBy('id', 'desc')->take(100)->get();;

       //Return collection of password as a resource
       return PasswordResource::collection($passwords);
   }


   public function store(Request $request)
   {
       //create password
       $password = $request->isMethod('put') ? Password::findOrFail
       ($request->id): new Password;

       $password->id = $request->input('id');
       $password->password = $request->input('password');

       if($password->save()){
         return new PasswordResource($password);

       }

   }

   /**
    * Display the specified resource.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function show($id)
   {
      //Get Password
       $password = Password::findOrFail($id);

       //Return single password as a resource
       return new PasswordResource($password);
   }


   /**
    * Remove the specified resource from storage.
    *
    * @param  int  $id
    * @return \Illuminate\Http\Response
    */
   public function destroy($id)
   {
     //Get Password
     $password = Password::findOrFail($id);

     if($password->delete()){
         return new PasswordResource($password);
     }
   }

}
