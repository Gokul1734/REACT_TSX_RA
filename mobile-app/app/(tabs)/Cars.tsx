import React, { useEffect, useState } from "react";
import { VirtualizedList, Text, View, StyleSheet } from "react-native";

interface Car {
  id: number;
  model: string;
  year: number;
  price: number;
  mileage: number;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getItem = (data: Car[], index: number) => data[index];
  const getItemCount = (data: Car[]) => data.length;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://192.168.0.44:8000/api/cars/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Car[] = await response.json();
        setCars(data);
      } catch (err: any) {
        console.error("Error fetching car data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const renderItem = ({ item }: { item: Car }) => (
    <View style={styles.carContainer}>
      <Text style={styles.carTitle}>
        {item.model} ({item.year})
      </Text>
      <Text>Price: ${item.price}</Text>
      <Text>Mileage: {item.mileage} miles</Text>
    </View>
  );

  const listHeader = () => (
    <View>
      <Text style={styles.header}>Car Listings</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {!loading && !error && cars.length === 0 && <Text>No cars available.</Text>}
    </View>
  );

  return (
    <VirtualizedList
      data={cars}
      initialNumToRender={10}
      keyExtractor={(item) => item.id.toString()}
      getItem={getItem}
      getItemCount={getItemCount}
      renderItem={renderItem}
      ListHeaderComponent={listHeader}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  carContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  carTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});

export default CarList;
