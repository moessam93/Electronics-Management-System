class GetAllPricesRequestDto {
    constructor(pageNum = 1, pageSize = 10, searchKeyword = '') {
        this.pageNum = pageNum;
        this.pageSize = pageSize;
        this.searchKeyword = searchKeyword;
    }
}

class GetAllPricesResponseDto {
    constructor (totalRecords,data){
        this.totalRecords = totalRecords;
        this.data = data;
    }
}

class GetSinglePartPriceRequestDto {
    constructor (partNumber){
        this.partNumber = partNumber;
    }
}

class GetSinglePartPriceResponseDto {
    constructor (partNumber,price){
        this.partNumber = partNumber;
        this.price = price;
    }
}

module.exports ={GetAllPricesResponseDto,GetAllPricesRequestDto,GetSinglePartPriceRequestDto, GetSinglePartPriceResponseDto} ;
