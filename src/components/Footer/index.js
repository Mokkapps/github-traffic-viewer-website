import React from 'react';
import { Footer, Container, Content, Columns, Column, Icon } from 'bloomer';

const AppFooter = () => (
  <Footer id="footer">
    <Container>
      <Content>
        <Columns>
          <Column>
            <p>
              Made with<Icon hasTextColor="danger" className="fa fa-heart" />
              by <a href="https://www.mokkapps.de">Mokkapps</a>
            </p>
          </Column>
        </Columns>
        <Content isSize="small">
          <p>
            The source code is licensed under <a target="_blank">MIT</a>.
          </p>
        </Content>
      </Content>
    </Container>
  </Footer>
);

export default AppFooter;
