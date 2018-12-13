import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';

import './hashTagInput.scss';
import { HashTagSuggestions } from './hashTagSuggestions'

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class HashTagInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [
                { id: "Thailand", text: "Thailand" },
                { id: "Austria", text: "Austria" }
            ],
            suggestions: HashTagSuggestions
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.props.action(this.state.tags);
    }

    handleDelete(i) {
        const { tags } = this.state;
        const newTags = tags.filter((tag, index) => index !== i);
        this.setState({
            tags: newTags,
        });

        this.props.action(newTags);
    }

    handleAddition(tag) {
        const newTags = [...this.state.tags, tag];
        this.setState(state => ({ 
            tags: newTags
         }));

        this.props.action(newTags);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    render() {
        const { tags, suggestions } = this.state;
        return (
            <div>
                <ReactTags
                    inline
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div>
        )
    }
};

HashTagInput.propTypes = {
    action: PropTypes.func.isRequired
}

export default HashTagInput;