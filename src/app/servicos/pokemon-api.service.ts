import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'; // caminho  que leva ate a api rest

  constructor( private http: HttpClient) { }

  public buscarTodos(pagina: number){ //metodo pra buscar os pokemons
    if ( pagina <= 0) {
      pagina = 1;
    }
    return this.http.get(`${this.url}?page=${pagina}`);
  }

  public buscarPokemonPorId(url: string) { // metodo pra buscar os pokemons pelo seu respectivo id
    return this.http.get(`${url}`);
  }

 
  
}