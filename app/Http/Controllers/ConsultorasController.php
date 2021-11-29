<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Consultoras;


class ConsultorasController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $consultora = DB::table('consultoras')->get();
        echo $consultora;
    }
    public function information(Request $request){
        $consultora = DB::table('consultoras')
        ->join('redes_consultoras', 'consultoras.redes_consultora_id', '=', 'redes_consultoras.id')
        ->select('consultoras.*', 'redes_consultoras.nombre_red')
        ->where('email', $request->email)
        ->get();
        return $consultora;
    }
    public function redes(Request $request){
        $consultora = DB::table('consultoras')
        ->where('redes_consultora_id', $request->redes_consultora_id)
        ->where('nivel_consultora_id', 2)
        ->orWhere('nivel_consultora_id', 3)
        ->get();
        return $consultora;
    }
    public function index_email(Request $request){
        $consultora = DB::table('consultoras')
        ->where('email', $request->email)
        ->get();
        return $consultora;
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre_consultora'=> 'required|max:255',
            'apellido_paterno_consultora'=> 'required|max:255',
            'apellido_materno_consultora'=> 'required|max:255',
            'email'=> 'required|unique:consultoras|email',
            'estado'=> 'required',
            'telefono'=> 'required|max:10',
            'domicilio'=> 'required|max:255',
            'redes_consultora_id' => 'required',
            'nivel_consultora_id' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        $consultora = Consultoras::create([
            'nombre_consultora'=>$request->nombre_consultora,
            'apellido_paterno_consultora'=>$request->apellido_paterno_consultora,
            'apellido_materno_consultora'=>$request->apellido_materno_consultora,
            'email'=>$request->email,
            'estado'=>$request->estado,
            'telefono'=>$request->telefono,
            'domicilio'=>$request->domicilio,
            'redes_consultora_id'=>$request->redes_consultora_id,
            'consultora_red'=>$request->consultora_red,
            'nivel_consultora_id'=>$request->nivel_consultora_id,
        ]);
        $consultora = DB::table('consultoras')->get();
        return $consultora;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre_consultora'=> 'required|max:255',
            'apellido_paterno_consultora'=> 'required|max:255',
            'apellido_materno_consultora'=> 'required|max:255',
            'email'=> 'required',
            'estado'=> 'required',
            'telefono'=> 'required|max:10',
            'domicilio'=> 'required|max:255',
            'redes_consultora_id' => 'required',
            'nivel_consultora_id' => 'required'
        ]);
        if ($validator->fails()){
            return response()->json(['missing'=> 'true'], 200);
        }
        Consultoras::where('id',$request->id)
        ->update([
            'nombre_consultora'=>$request->nombre_consultora,
            'apellido_paterno_consultora'=>$request->apellido_paterno_consultora,
            'apellido_materno_consultora'=>$request->apellido_materno_consultora,
            'email'=>$request->email,
            'estado'=>$request->estado,
            'telefono'=>$request->telefono,
            'domicilio'=>$request->domicilio,
            'redes_consultora_id'=>$request->redes_consultora_id,
            'consultora_red'=>$request->consultora_red,
            'nivel_consultora_id'=>$request->nivel_consultora_id
        ]);
        $consultora = DB::table('consultoras')->get();
        return $consultora;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Consultoras::where('id', $request->id)->delete();
        $consultora = DB::table('consultoras')->get();
        return $consultora;
    }
}
