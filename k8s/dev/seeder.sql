-- Insert a fake client
INSERT INTO public.clients ( cpf, email, name, created_at, updated_at) VALUES ('123.456.789-09', 'fulanosilva@gmail', 'Fulano da Silva', '2023-11-02 01:27:33.200', '2023-11-02 01:27:33.200');

-- Insert products data
INSERT INTO public.products (name, description, category, price, active) VALUES ('Sorvete', 'Lorem ipsum dolor sit amet', 'Sobremesa', 3.000000000000000000000000000000, true);
INSERT INTO public.products (name, description, category, price, active) VALUES ('Milk Shake', 'Lorem ipsum dolor sit amet', 'Sobremesa', 6.000000000000000000000000000000, true);
INSERT INTO public.products (name, description, category, price, active) VALUES ('Hamburguer', 'Lorem ipsum dolor sit amet', 'Lanche', 10.000000000000000000000000000000, true);
INSERT INTO public.products (name, description, category, price, active) VALUES ('Fanta', 'Lorem ipsum dolor sit amet', 'Bebida', 6.000000000000000000000000000000, false);
INSERT INTO public.products (name, description, category, price, active) VALUES ('Coca Cola', 'Lorem ipsum dolor sit amet', 'Bebida', 8.300000000000001000000000000000, true);
INSERT INTO public.products (name, description, category, price, active) VALUES ('Batata frita', 'Lorem ipsum dolor sit amet', 'Acompanhamento', 5.500000000000000000000000000000, true);