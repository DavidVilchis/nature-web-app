<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PassportAuthController extends Controller
{
    public function register(Request $request){
        $this->validate($request, [
            'name' => 'required|min:4',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('LaravelAuthApp')->accessToken;
        return response()->json(['missing' => 'false'], 200);
    }
    public function login(Request $request){

        $data=[
            'email' => $request->email,
            'password' => $request->password
        ];
        if(auth()->attempt($data)){
            $token = auth()->user()->createToken('LaravelAuthApp')->accessToken;
            return response()->json(['token'=>$token], 200);
        } else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }
    public function index(Request $request){
        $consultora = DB::table('users')
        ->where('email', $request->email)
        ->get();
        foreach ($consultora as $result){
            if($result->id != 0){
                return response()->json(['hasUser'=>'true'], 200);
            }
        }
    }
    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'password'=> 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $user = User::where('email',$request->email)
        ->update([
            'password' => bcrypt($request->password),
            'name'=>$request->name
        ]);
        if($user){
            return response()->json(['update'=>'true'], 200);
        }
        else{
            return response()->json(['update'=>'false'], 200);
        }
    }
    public function destroy(Request $request){
        User::where('email', $request->email)->delete();
    }
}
