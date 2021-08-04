import React from 'react'
import { ScrollView } from 'react-native'
import { Button, Flex, List, Radio, WingBlank } from '../../'
const RadioItem = Radio.RadioItem

export default class BasicRadioExample extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context)
    this.state = {
      disabled: false,
      part1Value: 1,
      part2Value: 1,
    }
  }

  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    })
  }

  onChange2 = (e: { target: { value: any } }) => {
    this.setState({
      part2Value: e.target.value,
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
          <RadioItem
            checked={this.state.part1Value === 1}
            onChange={(event) => {
              if (event.target.checked) {
                this.setState({ part1Value: 1 })
              }
            }}>
            {' '}
            Use Ant Design Component
          </RadioItem>
          <RadioItem
            checked={this.state.part1Value === 2}
            onChange={(event) => {
              if (event.target.checked) {
                this.setState({ part1Value: 2 })
              }
            }}>
            {' '}
            Use Ant Design Component
          </RadioItem>
        </List>
        <List
          renderHeader="单选组合 RadioGroup"
          renderFooter="一组互斥的 Radio 配合使用">
          <Radio.Group onChange={this.onChange2} value={this.state.part2Value}>
            <Radio value={1}>A</Radio>
            <Radio value={2}>B</Radio>
            <Radio value={3}>C</Radio>
            <Radio value={4}>D</Radio>
          </Radio.Group>
        </List>
        <List
          renderHeader="垂直布局 RadioItem"
          renderFooter="垂直的 Radio.Group，配合更多输入框选项">
          <Radio.Group onChange={this.onChange2} value={this.state.part2Value}>
            <RadioItem value={1}>Option A</RadioItem>
            <RadioItem value={2}>Option B</RadioItem>
            <RadioItem value={3}>Option C</RadioItem>
            <RadioItem value={4}>More...</RadioItem>
          </Radio.Group>
        </List>
      </ScrollView>
    )
  }
}
