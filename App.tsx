import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';

import { Header } from './components/Header/Header';
import { Card } from './components/Card/Card';
import { s } from './App.style';
import { Footer } from './components/Footer/Footer';
import { Add } from './components/Add/Add';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([
    { id: '1', title: 'Learn React Native', completed: true },
    { id: '2', title: 'Learn TypeScript', completed: false },
    { id: '3', title: 'Learn Expo', completed: false },
    { id: '4', title: 'Learn React Native', completed: true },
    { id: '5', title: 'Learn TypeScript', completed: false },
    { id: '6', title: 'Learn GraphQL', completed: false },
    { id: '7', title: 'Learn Redux', completed: false },
    { id: '8', title: 'Learn Jest', completed: true },
    { id: '9', title: 'Learn Next.js', completed: false },
  ]);

  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const getFilteredTodoList = (tab: string) => {
    switch (tab) {
      case 'all':
        return todoList;
      case 'inprogress':
        return todoList.filter(todo => !todo.completed);
      case 'done':
        return todoList.filter(todo => todo.completed);
      default:
        return todoList;
    }
  };

  const deleteTodo = (todo: Todo) => {
    Alert.alert(
      'Delete Todo',
      `Are you sure you want to delete "${todo.title}"?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Delete', onPress: () => deleteTodoItem(todo), style: 'destructive' },
      ],
      { cancelable: false }
    );
  };

  const deleteTodoItem = (todo: Todo) => {
    const updatedTodoList = todoList.filter(item => item.id !== todo.id);
    setTodoList(updatedTodoList);
  };

  const renderTodoList = () => {
    return getFilteredTodoList(selectedTab).map((todo, index) => (
      <Card todo={todo} handleLongPress={deleteTodo} index={index} key={index} handlePress={updateTodo} />
    ));
  };

  const updateTodo = (id: string) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  const addTodo = () => {
    if (!inputValue) {
      return;
    }
    const newTodo: Todo = {
      id: uuid.v4(),
      title: inputValue,
      completed: false,
    };
    setTodoList([...todoList, newTodo]);
    setShowAddDialog(false);
    setInputValue('');
  };

  const renderAddDialog = () => {
    return (
      <Dialog.Container visible={showAddDialog} onBackdropPress={() => setShowAddDialog(false)}>
          <Dialog.Title>Add ToDo</Dialog.Title>
          <Dialog.Description>
            Choose a title for your new todo.
          </Dialog.Description>
          <Dialog.Input onChangeText={(text) => setInputValue(text)}  placeholder="Title" />
          <Dialog.Button label="Cancel" onPress={() => setShowAddDialog(false)}/>
          <Dialog.Button label="Save" onPress={addTodo}/>
      </Dialog.Container>
    );
  };

  const showAddDialogPopup = () => {
    setShowAddDialog(true);
  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
            <Header />
            <View style={s.body}>
              <ScrollView>
                { renderTodoList() }
              </ScrollView>
            </View>
            <Add onPress={() => showAddDialogPopup()}/>
        </SafeAreaView>
      </SafeAreaProvider>
      <Footer 
        onPress={setSelectedTab} 
        tab={selectedTab} 
        todoList={todoList}
        />
        {renderAddDialog()}
    </>
  );
};

export default App;