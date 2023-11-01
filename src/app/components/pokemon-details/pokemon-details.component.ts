import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: any = {}; 

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id')); 
      this.loadPokemonDetail(id);

      console.log(id)
    });
  }

  loadPokemonDetail(id: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    this.http.get(url).subscribe((response: any) => {
      this.pokemon = response;
    });
  }

  formatStats(stats: any[]): string[] {
    if (!stats || !Array.isArray(stats)) {
      return [];
    }
    return stats.map((stat) => {
      return `${stat.stat.name}: ${stat.base_stat}`;
    });
  }
}
