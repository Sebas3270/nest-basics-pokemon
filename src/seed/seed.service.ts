import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PokeReponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {

  private readonly axios = axios;
  
  async executeSeed(){
    const { data } = await this.axios.get<PokeReponse>('https://pokeapi.co/api/v2/pokemon?limit=10');
    data.results.forEach(({name, url}) => {
      const parts = url.split('/')
      const no = Number(parts[parts.length - 2]);
      console.log(name, no)
    })
    return data.results;
  }

}