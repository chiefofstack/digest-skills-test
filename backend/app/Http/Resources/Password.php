<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Password extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return[
          'id' => $this->id,
          'password' => $this->password
        ];
    }


    public function with($request) {
        return[
          'version' => '1.0.0',
          'author_url' => url('http://jumpsite.com')
        ];
    }


}
