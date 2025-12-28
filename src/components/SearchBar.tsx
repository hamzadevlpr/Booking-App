import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import SearchIcon from '../assets/icons/search.svg';
import FilterIcon from '../assets/icons/filter.svg';

interface SearchBarProps {
    searchText: string;
    onSearchChange: (text: string) => void;
    onFilterPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    searchText, 
    onSearchChange, 
    onFilterPress 
}) => {
    return (
        <View style={styles.searchContainer}>
            <SearchIcon width={18} height={18} fill="#0F1831" style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={onSearchChange}
                placeholderTextColor="#8C95A8"
            />
            <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
                <FilterIcon width={18} height={18} fill="#0F1831" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 140,
        left: 16,
        right: 16,
        paddingVertical: 4,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 2,
        marginHorizontal: 26,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        borderColor: '#E9EBED',
        justifyContent: 'space-between',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: '#9CA4AB',
    },
    searchIcon: {
        marginLeft: 18,
    },
    filterBtn: {
        marginRight: 18,
        paddingLeft: 12,
        paddingVertical: 8,
        borderLeftWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SearchBar;