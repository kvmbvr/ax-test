import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  data: any[] = [];
  offset = 0;
  limit = 6;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemonData()
  }

  loadPokemonData() {
    const url = `${this.apiUrl}?limit=${this.limit}&offset=${this.offset}`;
    this.http.get(url).subscribe((response: any) => {
      const results = response.results;
      results.forEach((pokemon: any) => {
        this.http.get(pokemon.url).subscribe((pokemonData: any) => {
          this.data.push(pokemonData);
        });
        
      });
    });
  }

  loadMore() {
    this.offset += this.limit;
    this.loadPokemonData();
  }

  goToPokemonDetail(id: number) {
    this.router.navigate([id]);
  }
}
