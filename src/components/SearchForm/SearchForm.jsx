import { Component } from "react";
import css from './SearchForm.module.css'

class SearchForm extends Component {
    render() { 
        return (
          <>
            <form className={css.SearchForm}>
              <button type="submit" className={css.SearchFormButton}>
                <span className={css.SearchFormButtonLabel}>Search</span>
              </button>

              <input
                className={css.SearchFormInput}
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
              />
            </form>
          </>
        );
    }
}
export default SearchForm;