import { fireEvent, render, screen } from "@testing-library/react"
import Home from "./index"
// Importé le hook pour simulation
import { DataContext } from "../../contexts/DataContext"

const mockData = {
  last: { id: 1, title: "Dernier événement" },
}

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />)
    await screen.findByText("Email")
    await screen.findByText("Nom")
    await screen.findByText("Prénom")
    // Corrigé typo 'Personel'
    await screen.findByText("Personnel / Entreprise")
  })

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />)
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      )
      await screen.findByText("En cours")
      await screen.findByText("Message envoyé !")
    })
  })
})

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<Home />)
    const events = await screen.findByTestId("events")
    expect(events).toBeInTheDocument()
  })

  it("a list of people is displayed", async () => {
    render(<Home />)
    await screen.findByText("CEO")
    await screen.findByText("Jean-Baptiste")
    await screen.findByText("Christine")
  })

  it("a footer is displayed", () => {
    render(<Home />)
    const footer = screen.getByTestId("footer")
    expect(footer).toBeInTheDocument()
  })

  it("an event card, with the last event, is displayed", async () => {
    // Données simulées injectées via le contexte
    render(
      <DataContext.Provider value={mockData}>
        <Home />
      </DataContext.Provider>
    )

    // Vérification que la carte d'événement est présente et que le titre est correct
    const eventCard = await screen.findByTestId("event-card")
    expect(eventCard).toBeInTheDocument()

    // Vérification que le titre de l'événement est bien celui attendu
    await screen.findByText(mockData.last.title)
  })
})