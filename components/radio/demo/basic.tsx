import React from 'react'
import { ScrollView } from 'react-native'
import { Button, Flex, List, Radio, WingBlank } from '../../'
const RadioItem = Radio.RadioItem

export default class BasicRadioExample extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      disabled: false,
    }
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    })
  }

  render() {
    return (
      <ScrollView>
        <List renderHeader="基本用法">
          <List.Item thumb={<Radio>Radio</Radio>} />
        </List>
        <List
          renderHeader="不可用"
          renderFooter={
            <Button type="primary" onPress={this.toggleDisabled}>
              Toggle disabled
            </Button>
          }>
          <List.Item>
            <Flex>
              <Radio defaultChecked={false} disabled={this.state.disabled}>
                Disabled
              </Radio>
              <WingBlank />
              <Radio disabled={this.state.disabled}>Disabled</Radio>
            </Flex>
          </List.Item>
        </List>
        <List renderHeader="RadioItem">
          <RadioItem> Use Ant Design Component</RadioItem>
        </List>
      </ScrollView>
    )
  }
}
