import { Component } from '@angular/core';
import { PokemonApiService } from '../servicos/pokemon-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listarPokemons: any = [];
  public pagina = 1;
  public totalPaginas = 105;
  constructor(private pokemonService: PokemonApiService) { }

  ionViewWillEnter() {
    this.buscarPokemons(1);
  }
  public buscarPokemons(pagina: number) {
    if (pagina <= 0) {
      pagina = 1;
    }
    this.pagina = pagina;

    this.pokemonService.buscarTodos(pagina).subscribe(dados => { //busca todos os pokemons da lista da Api
      this.listarPokemons = [];
      this.totalPaginas = dados['count'];
      let listaApi = dados['results'];
      for (let item of listaApi) {
        this.pokemonService.buscarPokemonPorId(item.url).subscribe(dadosPokemon => {
          this.listarPokemons.push(dadosPokemon);
        });
      }
    });
  }


}
