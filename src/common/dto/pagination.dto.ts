import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;
    
    @IsOptional()
    @IsPositive()
    offset?: number;
}