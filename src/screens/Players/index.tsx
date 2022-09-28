import { ButtonIcon } from '@components/Buttonicon'
import { Header } from '@components/Header'
import { Highlight } from '@components/HighLight'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Buttons'

import * as S from './styles'
import { Alert, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroup } from '@storage/player/playerGetByGroups'
import { playersGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'

type RouteParams = {
  group: string;
};

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const navigation = useNavigation()
  const route = useRoute();
  const { group } = route.params as RouteParams;
  
  async function handleAddPlayer(){
    
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Nova pessoa','Informe o nome da pessoa para adicionar')
    }
    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try{
      await playerAddByGroup(newPlayer, group);
      setNewPlayerName('');
      fetchPlayersByTeam();
    }catch (error){

      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message)
      }else{
        console.log(error);
        Alert.alert('Nova pessoa','Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayersByTeam(){
    try{
      const playersByTeam = await playersGetByGroupAndTeam(group,team);
      setPlayers(playersByTeam);
    }catch (error){
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');
    }
  }

  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error){
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa.')
    }
  }

  async function groupRemove(){
    try{
      await groupRemoveByName(group);
      navigation.navigate('groups');
    }catch (error){
      console.log(error)
      Alert.alert('Grupo' , 'Não foi possível remover o grupo')
    }
  }

  async function handleGroupRemove(){
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()}
      ]
    );
  }

  useEffect(()=>{
    fetchPlayersByTeam();
  },[team]);

  return(
    <S.Container>
      <Header  showBackButton/>

      <Highlight
        title={group}
        subtitle='Adicione a galera e separe os times'
      />
      <S.Form>
        <Input
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          placeholder="Nome da Pessoa"
          autoCorrect={false}
        />
        
        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
        />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() =>setTeam(item)}
            />
          )}
          horizontal
        />
        <S.NumberOfPlayers>
          {players.length}
        </S.NumberOfPlayers>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <PlayerCard 
          name={item.name}
          onRemove={()=> handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty 
          message='Não há pessoas nesse time'
          />
         )}
         showsVerticalScrollIndicator={false} //tira a barra de rolagem
         contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex:1}
          ]}
        />

        <Button
          title="Remover Turma"
          type="SECONDARY"
          onPress={handleGroupRemove}
        />
        
    </S.Container>
  )
}