import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/HighLight';
import { Button } from '@components/Buttons';
import { ListEmpty } from '@components/ListEmpty';

import * as s from './styles';

import { FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupGetAll';

export function Groups() {
  const [Groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new');
  }

  async function fetchGroups(){
    try{
      const data = await groupsGetAll();
      setGroups(data);
    }catch (error){
      console.log(error);
    }
  }

  function handleOpenGroup(group: string){
    navigation.navigate('players',{group})
  }

  useFocusEffect(useCallback(()=>{
    fetchGroups()
  },[]));

  return (
    <s.Container>
        <Header />
        <Highlight
          title='Turmas'
          subtitle='Jogue com a sua turma'
        />
        <FlatList
         data={Groups}
         keyExtractor={ item => item}
         renderItem={({ item })=>(
          <GroupCard
          title={item}
          onPress={()=> handleOpenGroup(item)}
          />
         )}
         contentContainerStyle={Groups.length === 0 && { flex : 1 }}
         ListEmptyComponent={() => (
          <ListEmpty 
          message='Que tal cadastrar a primeira turma?'
          />
         )}
        />
        <Button
          title='Criar nova turma'
          onPress={handleNewGroup}
        />

    </s.Container>
  );
}  

