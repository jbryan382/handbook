import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Heading } from './Heading'
import { Description } from './Description'
import { SubHeading } from './SubHeading'
import { ModuleItem as Item } from './Item'

export function ProgramMenu() {
  const {
    allProgramsYaml: { nodes: programs },
  } = useStaticQuery(graphql`
    query ProgramQuery {
      allProgramsYaml(sort: { fields: position, order: ASC }) {
        nodes {
          title
          modules {
            title
            description
            lessons
          }
          description
          id
        }
      }
    }
  `)

  return (
    <>
      <Heading icon="far fa-house">All Programs</Heading>
      {programs.map((program) => {
        return (
          <nav key={program.id}>
            <SubHeading>{program.title}</SubHeading>
            {program.description && (
              <Description>{program.description}</Description>
            )}

            <ul className="pl-3">
              {program.modules.map((module, index) => (
                <Item key={index} module={{ program, module }}>
                  {module.title}
                </Item>
              ))}
            </ul>
          </nav>
        )
      })}
    </>
  )
}