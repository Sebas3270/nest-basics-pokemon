import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeReponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ){}

  
  
  async executeSeed(){

    await this.pokemonModel.deleteMany({}); // DELETE FROM pokemon

    const pokemonToInsert: { name:string, no:number }[] = [];

    const { results } = await this.http.get<PokeReponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    results.forEach(({name, url}) => {
      const parts = url.split('/')
      const no = Number(parts[parts.length - 2]);

      pokemonToInsert.push({no,name})

    });

    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed';
  }

}