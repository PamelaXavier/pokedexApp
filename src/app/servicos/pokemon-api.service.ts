import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  
  public url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'; // caminho  que leva ate a api rest

  constructor( private http: HttpClient) { }

  public buscarTodos(){ //metodo pra buscar os pokemons
    return this.http.get(this.url);
  }

  public buscarPokemonPorId(url: string) { // metodo pra buscar os pokemons pelo seu respectivo id
    return this.http.get(url);
  }

 
  
}