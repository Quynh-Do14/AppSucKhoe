import React from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const cate = [
    {
        label: 'Breakfast',
        value: 'Breakfast',
        color: "#42a5f5"
    },
    {
        label: 'Lunch',
        value: 'Lunch',
        color: "#66bb6a"
    },
    {
        label: 'Dinner',
        value: 'Dinner',
        color: "#e927c2"
    },
    {
        label: 'All',
        value: '',
        color: "#e92727"
    },
];
type Props = {
    setTypeSelect: Function
}

const SearchAndFilter = (props: Props) => {
    const { setTypeSelect } = props
    const onSelectType = (value: string) => {
        setTypeSelect(value)
    }
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
                {
                    cate.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.filterButton, { backgroundColor: item.color }]}
                                onPress={() => onSelectType(item.value)}
                            >
                                <Text style={styles.filterText}>{item.label}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
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
