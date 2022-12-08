import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.trim().toLowerCase();

    try {

      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;

    } catch (error) {

      this.handleExceptions(error);

    }

  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(searchTerm: string) {

    let pokemon: Pokemon;

    if (!isNaN(Number(searchTerm))) {
      pokemon = await this.pokemonModel.findOne({ no: searchTerm })
    }

    if (isValidObjectId(searchTerm)) {
      pokemon = await this.pokemonModel.findById(searchTerm)
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: searchTerm })
    };

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no '${searchTerm}' not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.trim().toLowerCase();
    }

    try {

      const pokemon = await this.findOne(term);
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {

      this.handleExceptions(error);

    }

  }

  async remove(id: string) {

    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // await this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ _id: id });

    if( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id '${id}' not found`)

    return;

  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists in db ${JSON.stringify(error.keyValue)}`);
    }

    console.log(error);
    throw new InternalServerErrorException(`There is an error on the server, check with administrator and console logs`);

  }

}
