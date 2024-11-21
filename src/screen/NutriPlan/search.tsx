import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchAndFilter = () => {
    return (
        <View style={styles.container}>
            {/* Thanh tìm kiếm */}
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#555" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#aaa"
                    style={styles.searchInput}
                />
            </View>

            {/* Các nút lựa chọn */}
            <View style={styles.filterContainer}>
                <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#42a5f5' }]}>
                    <Text style={styles.filterText}>Breakfast</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filterButton, { backgroundColor: '#66bb6a' }]}>
                    <Text style={styles.filterText}>Lunch</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4f4e4e',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    filterButton: {
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    seeAllText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default SearchAndFilter;
