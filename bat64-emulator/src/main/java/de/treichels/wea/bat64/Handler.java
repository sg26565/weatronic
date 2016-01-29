package de.treichels.wea.bat64;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonBuilderFactory;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Path("/")
public class Handler {
	private static final Logger LOG = LogManager.getLogger();

	@POST
	@Path("/cgi/command")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject command(final String body) {
		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		LOG.debug(jsonObject);

		return jsonObject;
	}

	@POST
	@Path("/cgi/event")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject event(final String body) {
		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		LOG.debug(jsonObject);

		return jsonObject;
	}

	@POST
	@Path("/cgi/filemanagement")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject filemanagement(final String body) {
		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		LOG.debug(jsonObject);

		return jsonObject;
	}

	@POST
	@Path("/cgi/get_json")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject getJson(final String body) {
		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		LOG.debug(jsonObject);

		final Map<String, String> config = new HashMap<String, String>();
		final JsonBuilderFactory factory = Json.createBuilderFactory(config);
		final JsonObject result = factory.createObjectBuilder().add("Telemetry_Val", factory.createArrayBuilder().add(factory.createObjectBuilder()
		        .add("ID", "33968").add("Value", factory.createObjectBuilder().add("RemPowerTime", "01h:23m").add("IsRunOnDC", 0).add("MainVoltage", 3600))))
		        .build();

		LOG.debug(result);
		return result;
	}

	@GET
	public Response handleRedirect() throws URISyntaxException {
		System.out.println("<redirect>");
		return Response.temporaryRedirect(new URI("0.0__WelcomeScreen.html")).build();
	}

	@GET
	@Path("/{path:.+}")
	public Response handleStaticContent(@PathParam("path") final String path) throws IOException, URISyntaxException {
		LOG.debug(path);

		final InputStream is = Handler.class.getClassLoader().getResourceAsStream("www/" + path);
		if (is == null) {
			return Response.status(Status.NOT_FOUND).entity(path).build();
		}

		return Response.ok(is).build();
	}

	@POST
	@Path("/cgi/service")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject service(final String body) {
		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		LOG.debug(jsonObject);

		return jsonObject;
	}

	@POST
	@Path("/cgi/set_json")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	@Produces(MediaType.APPLICATION_JSON)
	public JsonObject setJson(final String body) {
		final Reader stringReader = new StringReader(body);
		final JsonReader jsonReader = Json.createReader(stringReader);
		final JsonObject jsonObject = jsonReader.readObject();
		LOG.debug(jsonObject);

		return jsonObject;
	}
}
