import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from './components/Header/Header';
import { Card } from './components/Card/Card';
import { s } from './App.style';
import { Footer } from './components/Footer/Footer';
import { Add } from './components/Add/Add';

type Todo = {
  id: string;
  title: string;
  description?: string;
  score?: number;
  dueDate?: string;
  priority?: string;
  tags?: string[];
  notes?: string;
  location?: string;
  reminder?: string;
  recurrence?: string;
  subtasks?: string[];
  attachments?: string[];
  createdAt?: string;
  updatedAt?: string;
  completed: boolean;
};

let isFirstLoad = true;
let isLoadUpdate = false;

const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showSingleDeleteDialog, setShowSingleDeleteDialog] = useState<boolean>(false);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const ScrollViewRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    loadTodoList();
  }, []);

  useEffect(() => {
    if (!isLoadUpdate) { // Prevents saving the list on load
      if (isFirstLoad) { // Prevents saving the list on first load
        isFirstLoad = false;
      } else {
        saveTodoList();
      }
    } else {
      isLoadUpdate = false;
    }
  }, [todoList]);

  const loadTodoList = async () => {
    console.log('Loading todo list');
    try {
      const todoListString = await AsyncStorage.getItem('@todoList');
      isLoadUpdate = true;

      if (todoListString) {
        setTodoList(JSON.parse(todoListString));
      } else {
        console.log('No todo list found');
        setTodoList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveTodoList = async () => {
    console.log('Saving todo list');
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList));
    } catch (error) {
      console.log(error);
    }
  };

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
    setTodoToDelete(todo);
    setShowSingleDeleteDialog(true);
  };

  const deleteTodoItem = (todo: Todo) => {
    const updatedTodoList = todoList.filter(item => item.id !== todo.id);
    setTodoList(updatedTodoList);
  };

  const handleDeleteAll = () => {
    setShowDeleteAllDialog(true);
  };

  const confirmDeleteAll = () => {
    setTodoList([]);
    setShowDeleteAllDialog(false);
  };

  const renderTodoList = () => {
    const filteredTodos = getFilteredTodoList(selectedTab);

    if (filteredTodos.length === 0) {
      return (
        <View style={{ padding: 20 }}>
          <Text style={{ color: '#888', fontSize: 16, textAlign: 'center' }}>
            You have nothing todo 🏖️.
          </Text>
        </View>
      );
    }

    return filteredTodos.map((todo, index) => (
      <Card
        todo={todo}
        handleLongPress={deleteTodo}
        handlePress={updateTodo}
        index={index}
        key={index}
      />
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
    setTimeout(() => {
      ScrollViewRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  const renderAddDialog = () => {
    return (
        <Dialog.Container
          visible={showAddDialog}
          onBackdropPress={() => setShowAddDialog(false)}
          contentStyle={s.modalContent}
        >

          <Dialog.Title
            style={s.modalTitle}
          >
            Add ToDo
          </Dialog.Title>
          <Dialog.Description style={s.modalText}>
            Choose a title for your new todo.
          </Dialog.Description>
          <Dialog.Input onChangeText={(text) => setInputValue(text)}  placeholder="Title" style={s.input} multiline={true} />
          <Dialog.Button label="Cancel" onPress={() => setShowAddDialog(false)} style={s.btn} />
          <Dialog.Button label="Save" onPress={addTodo} style={s.btn} />
      </Dialog.Container>
    );
  };

  const showAddDialogPopup = () => {
    setShowAddDialog(true);
  };

  const renderDeleteAllDialog = () => {
  return (
    <Dialog.Container
      visible={showDeleteAllDialog} // ✅ FIXED
      onBackdropPress={() => setShowDeleteAllDialog(false)}
      contentStyle={s.modalContent}
    >
      <Dialog.Title style={s.modalTitle}>Delete All?</Dialog.Title>
      <Dialog.Description style={s.modalText}>
        Are you sure you want to delete all your todos? This action can't be undone.
      </Dialog.Description>
      <Dialog.Button
        label="Cancel"
        onPress={() => setShowDeleteAllDialog(false)}
        style={s.btn}
      />
      <Dialog.Button
        label="Delete All"
        onPress={confirmDeleteAll}
        style={s.btn}
      />
    </Dialog.Container>
  );
};

  const renderDeleteDialog = () => {
  if (!todoToDelete) return null;

  return (
    <Dialog.Container
      visible={showSingleDeleteDialog}
      onBackdropPress={() => setShowSingleDeleteDialog(false)}
      contentStyle={s.modalContent}
    >
      <Dialog.Title style={s.modalTitle}>Delete Todo</Dialog.Title>
      <Dialog.Description style={s.modalText}>
        Are you sure you want to delete "{todoToDelete.title}"?
      </Dialog.Description>
      <Text style={s.modalHint}>
        Hold the '+' button to delete all tasks.
      </Text>
      <Dialog.Button
        label="Cancel"
        onPress={() => setShowSingleDeleteDialog(false)}
        style={s.btn}
      />
      <Dialog.Button
        label="Delete"
        onPress={() => {
          deleteTodoItem(todoToDelete);
          setShowSingleDeleteDialog(false);
          setTodoToDelete(null);
        }}
        style={s.btn}
      />
    </Dialog.Container>
  );
};

  return (
    <>
      <SafeAreaProvider style={s.safeArea}>
        <SafeAreaView style={s.app}>
            <Header />
            <View style={s.body}>
              <ScrollView ref={ScrollViewRef}>
                { renderTodoList() }
              </ScrollView>
            </View>
            <Add 
              onPress={showAddDialogPopup} 
              onLongPress={handleDeleteAll}
              />
        </SafeAreaView>
      </SafeAreaProvider>
      <Footer 
        onPress={setSelectedTab} 
        tab={selectedTab} 
        todoList={todoList}
        />
        {renderAddDialog()}
        {renderDeleteDialog()}
        {renderDeleteAllDialog()}
    </>
  );
};

export default App;