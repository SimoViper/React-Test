import React from 'react';

const Result = ({result}) => {
    if(!result) return ''
    return <div>
        <p>{result.filmId}</p>
        <p>{result.title}</p>
        <p>{result.description}</p>
        <p>{result.language}</p>
        <div>
            {result.actors.map(actor => <p>{actor}</p>)};
        </div>
    </div>;
}

const Search = (props) => {
    const {
        searchQuery,
        onChange,
        search
    } = props;

    return <div>
        <input
            type="text"
            value={searchQuery}
            onChange={onChange}
        />
        <button onClick={search}>Search</button>
    </div>;
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: '',
            result: ''
        }

        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearchQueryChange(e) {
        this.setState({searchQuery: e.target.value});
    }

    onSearch() {
        console.log('in Search', this.state.searchQuery);
        fetch('http://192.168.99.100:31346/movies/movie-details/' + this.state.searchQuery)
            .then(response => {
                if (!response.ok) {
                    throw Error("Failed connection to the API")
                }
                return response
            })
            .then(response => response.json())
            .then(response => {
                console.log('Response', response);
                this.setState({
                    result: response
                })
            }, () => {
                this.setState({
                    requestFailed: true
                })
            })
    }

    render() {
        const {result, searchQuery} = this.state;

        return <div>
            <Search
                searchQuery={searchQuery}
                onChange={this.onSearchQueryChange}
                search={this.onSearch}
            />
            <Result result={result} />
        </div>;
    }
}
export default App;