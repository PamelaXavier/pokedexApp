import { Component } from '@angular/core';
import { PokemonApiService } from '../servicos/pokemon-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listarPokemon = [];
  public listarExibir = [];
  public pagina = 1;
  public totalPaginas = 0;

  public next: string;
  public previous: string;

  constructor(private pokemonService: PokemonApiService) { 
    this.buscarPokemons();
  }


  public async buscarPokemons() {
    await this.pokemonService.buscarTodos().subscribe(dados => {
      this.listarPokemon = [];
      this.totalPaginas = dados['count'] / 10;

      this.previous = dados['previous'];
      this.next = dados['next'] ;

      let listaApi = dados['results'];

      for (let item of listaApi) {
        this.pokemonService.buscarPokemonPorId(item.url).subscribe(dadosPokemon => {
          this.listarPokemon.push(dadosPokemon);

          this.ordenarLista();
        });
      }
    });
  }

  private ordenarLista() {
    this.listarPokemon.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
    this.listarExibir = this.listarPokemon;
  }

  public paginacao(url, movimento) {
    this.pagina = this.pagina + movimento;

    this.pokemonService.url = url;

    this.buscarPokemons();
  }


}
