
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, ShieldCheck, TrendingUp } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">FINCREDIBL</h1>
          </div>
          <Link to="/auth/login">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Connexion <ArrowRight className="ml-1" size={16} />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Simplifiez vos <span className="text-blue-600">créances commerciales</span> avec FINCREDIBL
              </h1>
              <p className="text-lg text-gray-600">
                Notre plateforme sécurisée connecte les PME et les investisseurs pour une gestion optimale des créances. Obtenez des liquidités rapidement ou investissez dans une opportunité rentable.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link to="/auth/login">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Commencer maintenant <ArrowRight className="ml-1" />
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="lg" variant="outline">
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img src="https://placehold.co/600x400/e6f0ff/0066ff?text=FINCREDIBL&font=open%20sans" alt="FINCREDIBL Platform" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Une solution complète pour la gestion des créances</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre plateforme offre des outils puissants pour optimiser votre trésorerie et votre rentabilité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Liquidité Immédiate</h3>
              <p className="text-gray-600">
                Transformez vos créances en liquidités sans attendre la date d'échéance. Financez votre développement et investissez dans votre croissance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sécurité Garantie</h3>
              <p className="text-gray-600">
                Notre processus rigoureux de vérification et notre technologie de pointe assurent la sécurité de toutes les transactions sur notre plateforme.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="h-14 w-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Landmark className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Rendements Attractifs</h3>
              <p className="text-gray-600">
                Pour les investisseurs, notre plateforme offre des opportunités d'investissement avec des rendements intéressants et un risque maîtrisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Un processus simple et transparent pour tous les utilisateurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Pour les PME</h3>
              <ol className="space-y-6">
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Soumettez vos créances</h4>
                    <p className="text-gray-600">Téléchargez les factures et fournissez les informations nécessaires sur votre client.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Validation rapide</h4>
                    <p className="text-gray-600">Notre équipe vérifie votre créance et l'approuve généralement en moins de 48 heures.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Recevez vos fonds</h4>
                    <p className="text-gray-600">Une fois financée par les investisseurs, recevez immédiatement les fonds sur votre compte.</p>
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Pour les Investisseurs</h3>
              <ol className="space-y-6">
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Parcourez les opportunités</h4>
                    <p className="text-gray-600">Explorez notre marketplace d'opportunités d'investissement vérifiées.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Investissez facilement</h4>
                    <p className="text-gray-600">Sélectionnez les créances qui correspondent à vos critères et investissez en quelques clics.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Recevez vos rendements</h4>
                    <p className="text-gray-600">À l'échéance, recevez votre capital investi plus les intérêts directement sur votre compte.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link to="/auth/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Rejoignez FINCREDIBL aujourd'hui <ArrowRight className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FINCREDIBL</h3>
              <p className="text-gray-400">
                La plateforme innovante qui connecte PMEs et investisseurs pour une gestion optimale des créances commerciales.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Notre équipe</a></li>
                <li><a href="#" className="hover:text-white">Carrières</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Témoignages</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white">Mentions légales</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 FINCREDIBL. Tous droits réservés.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
