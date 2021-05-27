import { Controller, Get, Route, SuccessResponse, Query, Security } from 'tsoa';
import { SearchResults } from '../types/search.results';
import { SearchService } from '../services/search.service';
import { AuthScope } from '../middlewares/authorization';

@Route('search')
export class SearchController extends Controller {
  private searchService = new SearchService();
  private readonly SEARCH_LIMIT = 21;

  @Security(AuthScope.AUTH)
  @Get()
  @SuccessResponse('200, OK')
  public async getSearch(
    @Query() value = '',
    @Query() limit = this.SEARCH_LIMIT,
  ): Promise<SearchResults> {
    return Promise.resolve(this.searchService.search(value, limit)).then(
      (searchResults: SearchResults) => {
        this.setStatus(200);
        return searchResults;
      },
      (err) => {
        throw err;
      },
    );
  }
}
